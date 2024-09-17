import { ComponentProps, FC, useEffect, useRef, useState } from "react";
import BASE_CLASSNAMES from "../../config/baseClassNames";
import { cn } from "../../libs/utils";
import Checkbox from "../Checkbox";
import { v4 as uuidv4 } from "uuid";
import Input from "../Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faFilter,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button";

interface MultiComboBoxProps extends ComponentProps<"div"> {
  options: { label: string; value: string }[];
  name?: string;
  pageSize?: number;
  selectAllLabel?: string[];
  onChange?: any;
  values?: any[];
  noOptionFoundLabel?:string;
}

const MultiComboBox: FC<MultiComboBoxProps> = ({
  className,
  name = `multiComboBox-${uuidv4()}`,
  options,
  selectAllLabel = ["Selecionar Todas", "Deselecionar Todas"],
  pageSize = 5, // Define quantas opções por página,
  onChange = () => [],
  noOptionFoundLabel = "Nenhuma opção encontrada",
  values = [],
  ...props
}) => {
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(values);
  const [ulHeight, setUlHeight] = useState(0);

  // Ref para o ul
  const ulRef = useRef<HTMLUListElement>(null);

  // Filtra as opções com base no filtro de busca
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOptions.length / pageSize);

  // Pagina as opções filtradas
  const paginatedOptions = filteredOptions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Verifica se todas as opções filtradas (não apenas da página atual) estão selecionadas
  const allSelected =
    options.length > 0 &&
    options.every((option) => selectedOptions.includes(option.value));

  // Lógica para selecionar todas as opções filtradas
  const handleSelectAll = () => {
    if (allSelected) {
      // Desmarca todos os itens filtrados
      const remainingSelected = selectedOptions.filter(
        (opt) => !filteredOptions.some((option) => option.value === opt)
      );
      setSelectedOptions(remainingSelected);
      onChange(remainingSelected);
    } else {
      // Seleciona todas as opções filtradas
      const newSelections = filteredOptions
        .map((option) => option.value)
        .filter((value) => !selectedOptions.includes(value));
      const newValue = [...selectedOptions, ...newSelections];
      setSelectedOptions(newValue);
      onChange(newValue);
    }
  };

  const handleClearFilter = () => {
    setFilter("");
  };

  const handleOptionChange = (value: string) => {
    if (selectedOptions.includes(value)) {
      const newValue = selectedOptions.filter((opt) => opt !== value);
      setSelectedOptions(newValue);
      onChange(newValue);
    } else {
      const newValue = [...selectedOptions, value];
      setSelectedOptions(newValue);
      onChange(newValue);
    }
  };

  useEffect(() => {
    if (ulRef.current) {
      setUlHeight(ulRef.current.clientHeight); // Atualiza a altura dinamicamente
    }
  }, []);

  return (
    <div
      className={cn(BASE_CLASSNAMES.multiComboBox.root, "flex flex-col gap-2")}
    >
      <div className="flex gap-2">
        <Input
          placeholder="Filtro ..."
          type="text"
          iconPosition="both"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <FontAwesomeIcon icon={faFilter} />
          <Button
            size="icon"
            variant="ghost"
            density="high"
            onClick={handleClearFilter}
          >
            <FontAwesomeIcon icon={faXmark} />
          </Button>
        </Input>
      </div>
      <div style={{ minHeight: `${ulHeight}px` }}>
        <ul className={cn("flex flex-col gap-1")} ref={ulRef}>
          <li>
            <Checkbox
              name={`selectAll-${name}`}
              checked={allSelected}
              onChange={handleSelectAll}
            >
              {selectAllLabel[allSelected ? 1 : 0]} ({options.length})
            </Checkbox>
          </li>
          {filteredOptions.length === 0 ? (
            <li className="text-govbr-gray-20">{noOptionFoundLabel}</li>
          ) : (
            paginatedOptions.map((option) => (
              <li key={uuidv4()}>
                <Checkbox
                  name={name}
                  value={option.value}
                  checked={selectedOptions.includes(option.value)}
                  onChange={() => handleOptionChange(option.value)}
                >
                  {option.label}
                </Checkbox>
              </li>
            ))
          )}
        </ul>
      </div>
      {filteredOptions.length > pageSize && (
        <div className="flex justify-between mt-2">
          <div className="flex gap-2 items-center w-full">
            <Button
              variant="ghost"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </Button>
            <div className="flex-1 text-center text-sm">
              {currentPage}/{totalPages}
            </div>
            <Button
              variant="ghost"
              size="icon"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export { MultiComboBox };
