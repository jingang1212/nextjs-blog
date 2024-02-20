// postcss.config.js
/**
 * 我们还建议通过在tailwind.config.js中指定content选项来配置内容源:
 * 
 * 默认情况下，Next.js会预渲染每个页面。这意味着Next.js提前为每个页面生成HTML，
 * 而不是让客户端JavaScript完成所有工作。预渲染可以带来更好的性能和SEO。
 * 
 * 每个生成的HTML都与该页所需的最少JavaScript代码相关联。
 * 当浏览器加载页面时，它的JavaScript代码运行并使页面完全交互式。(这个过程被称为 hydration。)
 * 
 * js的预渲染特性。
 * 预呈现的两种形式:静态生成和服务器端呈现。
 * 静态生成有数据和无数据。
 * getStaticProps以及如何使用它将外部博客数据导入索引页。

*/
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // 为了获得最佳性能并避免误报,内容配置要尽可能具体
  ],
};