import { parseISO, format } from "date-fns";

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return <time datetime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
  // 注意:您可以在date-fns网站上查看不同的format()字符串选项。
  // 现在，打开pages/posts/[id].js，在文件的顶部添加一个Date组件的导入，并在{postData.date}上使用它:
}
