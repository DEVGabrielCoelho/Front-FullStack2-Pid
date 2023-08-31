import { RiSearchLine } from "react-icons/ri";
import { GrFormClose } from "react-icons/gr";
import { Container, FormControl } from "react-bootstrap";
import { useRef, useState } from "react";
import "./searchbar.css";
export default function SearchBar({
  placeHolder,
  data,
  campKey,
  campSearch,
  functionSelect,
  value,
}) {
  const inputSearch = useRef();
  const [termSearch, setTermSearch] = useState(value ? value : "");
  const [dataList, setDataList] = useState(data);
  const [itemSelecionado, setItemSelecionado] = useState(false);

  function filterResult() {
    setDataList(
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
            if (!itemSelecionado) {
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
            setItemSelecionado(false);
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
                  setItemSelecionado(true);
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
