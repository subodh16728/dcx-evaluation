import React, { ChangeEvent, useState } from 'react';
import "../css/AddEdit.css"

interface Props{
  onDelete: (event: React.MouseEvent<HTMLElement>) => void
  onChange(arg: { title: string ; value: number|string; }): unknown;
  data:{title:string; value:string|number;}
  
}


const ProductFeature: React.FC<Props> = (props) => {
  const [title, setTitle] = useState(props.data.title);
  const [value, setValue] = useState(props.data.value);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTitle(e.target.value);
    props.onChange({ title: e.target.value, value });
  };

  const handleValueChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValue(e.target.value);
    props.onChange({ title, value: e.target.value });
  };
  
  return (
    <div className="feature-component">
      <ul>
        <li>
          <div className="feature-form">
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={handleTitleChange}
              required
            />
            <input
              type="text"
              placeholder="Enter value"
              value={value}
              onChange={handleValueChange}
              required
            />
            <i className="fa fa-trash" title='Delete Feature' onClick={props.onDelete}></i>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ProductFeature;