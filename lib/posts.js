import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from 'remark';
// 要呈现降价内容，我们将使用remark库。首先，让我们安装它:
import html from 'remark-html';
const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * 然后，打开lib/posts.js并在底部添加以下getAllPostIds函数。
 * 它将返回posts目录下的文件名列表(不包括.md):
 */
/**
 * 返回的列表不仅仅是字符串数组——它必须是类似上面注释的对象数组。
 * 每个对象必须具有params键并包含一个带有id键的对象(因为我们在文件名中
 * 使用[id])。否则，getStaticPaths将失败。最后，我们将导入
 * getAllPostIds函数，并在getStaticPaths中使用它。
 * 打开pages/posts/[id].js，在导出的Post组件上面复制以下代码:
 * import { getAllPostIds } from '../../lib/posts';
  export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
      paths,
      fallback: false,
    };
  }
 */
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}


/**
 * 实现getStaticProps
 * 我们需要获取必要的数据，以呈现具有给定id的帖子。
 * 为此，再次打开lib/posts.js并在底部添加以下getPostData函数。它将根据id返回post数据:
*/
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  // 使用gray-matter来解析post元数据部分
  const matterResult = matter(fileContents)


  // 使用remark将markdown转换为HTML字符串
  // 重要:我们在getPostData中添加了async关键字，
  // 因为我们需要使用await for remark。Async /await允许你异步获取数据。
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()
  // 将数据与id合并,将数据与id和contentHtml组合
  return{
    id,
    contentHtml,
    ...matterResult.data
  }

}