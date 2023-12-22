import React, { useState } from "react";
import { First_aid_Inter } from "../../Models/First_aid.tsx";
import Button from "react-bootstrap/Button";

interface FilterProps {
  first_aids: First_aid_Inter[];
  onFilterChange: (filteredFirst_aid: First_aid_Inter[]) => void;
}

const First_aid_Filter: React.FC<FilterProps> = ({
  first_aids,
  onFilterChange,
}) => {
  const [filter, setFilter] = useState<string>("");
  const [priceFrom, setPriceFrom] = useState<string>("");
  const [priceTo, setPriceTo] = useState<string>("");


  const FilterChange = () => {
    const filteredFirst_aid = first_aids.filter(
      (first_aid) =>
        first_aid.First_aid_Name.toLowerCase().includes(filter.toLowerCase()) &&
        (!priceFrom || first_aid.Price >= parseFloat(priceFrom)) &&
        (!priceTo || first_aid.Price <= parseFloat(priceTo))
    );
    onFilterChange(filteredFirst_aid);
  };

  const Filter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const PriceFrom = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceFrom(event.target.value);
  };

  const PriceTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceTo(event.target.value);
  };

  const ClearFilters = () => {
    setFilter("");
    setPriceFrom("");
    setPriceTo("");
    FilterChange();
  };

  React.useEffect(() => {
    FilterChange();
  }, [filter, priceFrom, priceTo]);

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
      <input
        type="text"
        placeholder="Поиск по названию"
        value={filter}
        onChange={Filter}
      />
      <input
        type="number"
        placeholder="От"
        id="priceFrom"
        value={priceFrom}
        onChange={PriceFrom}
      />
      <input
        type="number"
        placeholder="До"
        id="priceTo"
        value={priceTo}
        onChange={PriceTo}
      />
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
