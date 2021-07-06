import React from "react";
import { VirtualList } from "../../../components";
import "../../../components/virtual-list/style/index.less";
import "./index.less";

interface HomeProps {
  name: string;
}

interface DataItem {
  id: number;
  text: number;
}

const Home: React.FC = () => {
  const renderItem = (item: DataItem) => {
    return (
      <div className="item" key={item.id}>
        {item.text}
      </div>
    );
  };
  return (
    <div className="home">
      <VirtualList title="测试" renderItem={renderItem} />
    </div>
  );
};

export default Home;
