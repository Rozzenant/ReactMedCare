import React, { useState } from "react";
import { First_aid_Inter } from "../../Models/First_aid.tsx";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {setParamsSearch, setSearch, setFrom, setTo} from "../../store/Filter_first_aid_Slice.ts";
import {RootState} from "../../store/store.ts";

interface FilterProps {
  first_aids: First_aid_Inter[];
  onFilterChange: (filteredFirst_aid: First_aid_Inter[]) => void;
}

const First_aid_Filter: React.FC<FilterProps> = ({
  // first_aids,
  onFilterChange,
}) => {
  const [filter, setFilter] = useState<string>("");
  const [priceFrom, setPriceFrom] = useState<string>("");
  const [priceTo, setPriceTo] = useState<string>("");
  const dispatch = useDispatch();
  const search_params = useSelector((state: RootState) => state.filterFirst_Aid)

  const Filter = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(event.target.value))
    setFilter(event.target.value);
  };

  const PriceFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFrom(event.target.value))
    setPriceFrom(event.target.value);
  };

  const PriceTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTo(event.target.value))
    setPriceTo(event.target.value);
  };

  const Search = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/first_aid/", {
        params: {
          search: filter,
          from: priceFrom,
          to: priceTo,
        },
      });
      dispatch(setParamsSearch(
          {"search": filter, "from": priceFrom, "to": priceTo}
      ))
      onFilterChange(response.data['first_aids']);
      
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  };

  const ClearFilters = () => {
    setFilter("");
    setPriceFrom("");
    setPriceTo("");
    dispatch(setParamsSearch(
          {"search": "", "from": "", "to": ""}
      ))
    // FilterChange();
  };

  // React.useEffect(() => {
  //   FilterChange();
  // }, [filter, priceFrom, priceTo]);

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "5px"}}>
      <input
        type="text"
        placeholder="Поиск по названию"
        value={search_params.search}
        onChange={Filter}
      />
      <input
        type="number"
        placeholder="От"
        id="priceFrom"
        value={search_params.from}
        onChange={PriceFrom}
      />
      <input
        type="number"
        placeholder="До"
        id="priceTo"
        value={search_params.to}
        onChange={PriceTo}
      />
      <Button
          className="button-style"
          onClick={Search}
        >
          Поиск
        </Button>
      <Button
          className="button-style"
          onClick={ClearFilters}
        >
          Очистить
        </Button>
    </div>
  );
};

export default First_aid_Filter;