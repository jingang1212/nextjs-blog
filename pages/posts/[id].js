import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        {/* 最后，更新pages/posts/[id].js中的Post组件，使用dangerlysetinnerhtml来渲染contentHtml: 感觉类似vue中的v-html指令*/}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  // 使用 params.id 获取博客文章所需的数据
  // 像这样添加"await"关键字:
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

/**
 * 现在，这里有新的内容:
 * 我们将从该页导出一个名为 getStaticPaths 的异步函数。
 * 在这个函数中，我们需要返回id可能值的列表。
 *
 * 最后，我们需要再次实现getStaticProps—这次是为具有
 * 给定id的博客文章获取必要的数据。
 * getStaticProps 被赋予 params，其中包含id(因为文件名是[id].js)。
 *
 * 如果你想静态地在路径/posts/<id>中生成一个页面，其中<id>可以是动态的，那么…
 * 在/pages/posts/[id]创建一个页面。
 * 该页面文件必须包含:
 * 一个React组件来呈现这个页面。
 * getStaticPaths 返回id的可能值的数组。
 * getStaticProps 获取具有id的帖子所需的数据
 */

export async function getStaticPaths() {
  /**
   * paths包含 getAllPostIds() 返回的已知路径数组，
   * 其中包括由pages/posts/[id].js定义的参数。在路径关键文档中了解更多信息
   * 暂时忽略fallback: false—稍后我们将对此进行解释。
   */
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
    // 如果fallback为false，则getStaticPaths未返回的任何路径都将导致404页面。
    // 如果fallback为真，则getStaticProps的行为改变:
    // 从getStaticPaths返回的路径将在构建时呈现为HTML。
    // 在构建时未生成的路径不会导致404页面。相反，Next.js将在第一次请求该路径时提供页面的“后备”版本。
  };
}
