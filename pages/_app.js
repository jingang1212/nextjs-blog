/**
 * 要将全局CSS加载到你的应用中，创建一个名为pages/_app.js的文件，内容如下:
 * _app.js的默认导出是一个顶级React组件，它包装了应用程序中的所有页面。
 * 你可以使用这个组件在页面间导航时保持状态，
 * 或者像我们在这里做的那样添加全局样式
 * 
 * 全局CSS不能导入到pages/_app.js之外的原因是全局CSS会影响页面上的所有元素
 * 如果你要从主页导航到/posts/first-post页面，主页的全局样式会无意中影响到/posts/first-post。
 * 
*/
import '../styles/global.css'
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}