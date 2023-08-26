import { RiSearchLine } from "react-icons/ri";
import { GrFormClose } from "react-icons/gr";
import { Container, Form, FormControl } from "react-bootstrap";
import { useRef, useState } from "react";
import "./searchbar.css";

export default function SearchBar({
  placeHolder,
  data,
  campKey,
  campSearch,
  functionSelect,
  values,
}) {
  const inputSearch = useRef();
  const [termSearch, setTermSearch] = useState(values ? values : "");
  const [dataList, setdataList] = useState(data);
  const [itemSelect, setItemSelect] = useState(false);

  function filterResult() {
    setdataList(
      data.filter((item) => {
        return termSearch.length > 1
          ? item[campSearch].toLowerCase().includes(termSearch.toLowerCase())
          : false;
      })
    );
    let componentResult = document.querySelector("[data-result]");
    if (data.length > 0) {
      componentResult.style.display = "block";
    } else {
      componentResult.style.display = "none";
    }
  }

  return (
    <Container>
      <div className="bar">
        <RiSearchLine />
        <FormControl
          type="text"
          ref={inputSearch}
          placeholder={placeHolder}
          value={termSearch}
          required
          onChange={(e) => {
            setTermSearch(e.target.value.toLocaleLowerCase());
            filterResult();
            if (!itemSelect) {
              e.target.setAttribute("aria-invalid", true);
              e.target.setCustomValidity("xxx");
            } else {
              e.target.removeAttribute("aria-invalid");
              e.target.setCustomValidity("");
            }
          }}
        ></FormControl>
        <GrFormClose
          onClick={() => {
            setTermSearch("");
            filterResult();
            setItemSelect(false);
            functionSelect({});
            inputSearch.current.setAttribute("aria-invalid", true);
            inputSearch.current.setCustomValidity("xxx");
          }}
        />
      </div>
      <div className="result">
        <ul data-result>
          {dataList.map((item) => {
            return (
              <li
                key={item[campKey]}
                onClick={() => {
                  setTermSearch(item[campSearch]);
                  setItemSelect(true);
                  functionSelect(item);
                  inputSearch.current.setCustomValidity("");
                  let componentResult = document.querySelector("[data-result]");
                  componentResult.style.display = "none";
                }}
              >
                {item[campKey] + "-" + item[campSearch]}
              </li>
            );
          })}
        </ul>
      </div>
    </Container>
  );
}
