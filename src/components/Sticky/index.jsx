/*
  条件筛选栏吸顶功能实现：
  1 封装 Sticky 组件，实现吸顶功能
  2 在 HouseList 页面中，导入 Sticky 组件
  3 使用 Sticky 组件包裹要实现吸顶功能的 Filter 组件
  4 在 Sticky 组件中，创建两个 ref 对象 placeholder 和 content，分别指向占位元素和内容元素
  5 组件中，监听浏览器的 scroll 事件(注意销毁事件)
  6 在 scroll 事件中，通过 getBoundingClientRect() 方法得到筛选栏占位元素当前位置 top
  7 判断 top 是否小于 0（是否在可视区内）
  8 如果小于 0，就添加需要吸顶样式 fixed，同时设置占位元素高度(与条件筛选栏高度相同)
  9 否则，就移除吸顶样式，同时让占位元素高度为 0
*/

import { useRef, useEffect } from "react";

import PropTypes from "prop-types";

import styles from "./index.module.css";

function Sticky(props) {
  // 创建ref对象
  const placeholder = useRef();
  const content = useRef();

  // scroll 事件的事件处理程序
  const handleScroll = () => {
    // 获取DOM对象
    const placeholderEl = placeholder.current;
    const contentEl = content.current;
    console.log(placeholder);
    const { top } = placeholderEl.getBoundingClientRect();
    if (top < 0) {
      // 吸顶
      contentEl.classList.add(styles.fixed);
      placeholderEl.style.height = `${props.height}px`;
    } else {
      // 取消吸顶
      contentEl.classList.remove(styles.fixed);
      placeholderEl.style.height = "0px";
    }
  };

  useEffect(() => {
    // 订阅
    window.addEventListener("scroll", handleScroll);
    // 取消订阅
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {/* 占位元素 */}
      <div ref={placeholder} />
      {/* 内容元素 */}
      <div ref={content}>{props.children}</div>
    </div>
  );
}

Sticky.propTypes = {
  height: PropTypes.number.isRequired,
};

export default Sticky;
