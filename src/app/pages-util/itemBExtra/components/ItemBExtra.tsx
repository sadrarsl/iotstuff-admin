import React from "react";

type ItemBExtra = {
  data: Record<any, any>;
};

export default (props: ItemBExtra) => {
  const { data } = props;
  return (
    <div className="col-12 w-100 border-bottom border-dark my-2 d-flex flex-wrap">
      <p className="col-12 col-md-3">{data.id && `${data.id} :شناسه`}</p>
      <p className="col-12 col-md-3">{data.name && `${data.name} :نام`}</p>
      <input
        className="col-12 col-md-3"
        min={1}
        onChange={(e) => {
          data.minHandler(e.target.value);
        }}
        value={data.min}
      >
        <label>کمترین مقدار فروش</label>
      </input>
      <input
        className="col-12 col-md-3"
        onChange={(e) => {
          data.maxHandler(e.target.value);
        }}
        min={1}
        value={data.max}
      >
        <label>بیشترین مقدار فروش</label>
      </input>
    </div>
  );
};
