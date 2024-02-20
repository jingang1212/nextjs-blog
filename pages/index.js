import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  console.log(
    `因为getStaticProps只运行在服务器端。
  它永远不会在客户端运行。它甚至不会包含在浏览器的JS包中。
  这意味着您可以编写诸如直接数据库查询之类的代码，
  而无需将其发送给浏览器。`,
    allPostsData
  );
  /**
   * 因为它意味着在构建时运行，所以您将无法使用仅在请求时可用的数据，例如查询参数或HTTP头。
   * 只允许在页面中getStaticProps只能从页面中导出。您不能从非页面文件中导出它。
   * 这种限制的原因之一是React需要在呈现页面之前拥有所有必需的数据。
   * */
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
