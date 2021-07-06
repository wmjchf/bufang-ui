import React, { useEffect, useRef, useState, useCallback } from "react";

export interface VirtualListProp {
  title: string;
  renderItem: (item: any) => React.ReactNode;
}

interface DataItem {
  id: number;
  text: number;
}

const VirtualList: React.FC<VirtualListProp> = ({ title, renderItem }: VirtualListProp) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // 每个列表项的高度
  const [itemHeight, setItemHeigt] = useState(0);
  // 容器的高度
  const [containerHeight, setContainerHeigt] = useState(0);
  // 可见区域第一个的索引
  const [startIndex, setStartIndex] = useState(0);
  // 可见区域最多放的item
  const [maxCount, setMaxCount] = useState(20);
  // list数据
  const [allDataList, setAllDataList] = useState<Array<DataItem>>([]);
  // showList数据
  const [showDataList, setShowDataList] = useState<Array<DataItem>>([]);
  // 上padding填充
  const [topPaddingFill, setTopPaddingFill] = useState(0);
  // 下padding填充
  const [bottomPaddingFill, setBottomPaddingFill] = useState(0);
  // 生产数据
  const generateDataList = () => {
    const data = [];
    for (let i = 0; i < 100; i++) {
      const item = {
        id: i,
        text: ~~(Math.random() * 100 + 300)
      };
      data.push(item);
    }
    setAllDataList(data);
  };

  const handleScroll = useCallback(
    (e: Event) => {
      const scrollTop = containerRef.current?.scrollTop;
      if (scrollTop) {
        const scrollCount = scrollTop && scrollTop / itemHeight;
        setStartIndex(~~scrollCount);
      }
    },
    [itemHeight]
  );
  // 获取列表项的marginTop和marginBottom
  const getMargin = (dom: Element) => {
    const style = window.getComputedStyle(dom);
    const { marginTop, marginBottom } = style;
    return {
      marginTop,
      marginBottom
    };
  };
  // 获取每个列表项的高度
  const getItemHeight = (dom: HTMLElement) => {
    const height = dom.offsetHeight;
    const { marginBottom, marginTop } = getMargin(dom);
    return height + parseInt(marginBottom) + parseInt(marginTop);
  };
  // 获取容器(包裹item)的高度
  const getContainerHeight = (dom: HTMLElement) => {
    return dom.clientHeight;
  };

  // 初始化获取dom信息
  const getDomInformation = () => {
    if (containerRef.current) {
      const itemHeight = getItemHeight(containerRef.current.children[0] as HTMLElement);
      const containerHeight = getContainerHeight(containerRef.current);
      setItemHeigt(itemHeight);
      setContainerHeigt(containerHeight);
      setMaxCount(~~(containerHeight / itemHeight + 2));
    }
  };

  useEffect(() => {
    if (showDataList.length) {
      getDomInformation();
    }
  }, [showDataList]);

  useEffect(() => {
    containerRef.current?.addEventListener("scroll", handleScroll);
    return () => {
      containerRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    generateDataList();
  }, []);

  useEffect(() => {
    const showDataList = allDataList.slice(startIndex, maxCount);
    setShowDataList(showDataList);
    setTopPaddingFill(startIndex * itemHeight);
  }, [allDataList, maxCount, startIndex]);
  return (
    <div
      className="bufang-virtual-list"
      ref={containerRef}
      style={{ paddingTop: `${topPaddingFill}px`, paddingBottom: `${bottomPaddingFill}px` }}
    >
      {showDataList.map((item: DataItem) => {
        return renderItem(item);
      })}
    </div>
  );
};

VirtualList.defaultProps = {
  title: ""
};
export default VirtualList;
