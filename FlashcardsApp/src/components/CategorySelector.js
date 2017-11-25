import React from "react";
import { func, object, string } from "prop-types";

import { jsUcfirst } from "../utils";

CategorySelector.propTypes = {
  categories: object.isRequired,
  selectedCategory: string,
  onCategorySelect: func.isRequired
};

export default function CategorySelector({
  categories,
  selectedCategory,
  onCategorySelect
}) {
  return (
    <select
      style={{ width: "30%" }}
      className="form-control"
      value={selectedCategory}
      disabled={Object.keys(categories).length ? false : true}
      onChange={e => {
        onCategorySelect(e.target.value);
      }}
    >
      { Object.keys(categories).map(item => {
          return (
            <option key={item} value={item}>
              {jsUcfirst(categories[item].title.ru)}
            </option>
          );
        }) }
    </select>
  );
}
