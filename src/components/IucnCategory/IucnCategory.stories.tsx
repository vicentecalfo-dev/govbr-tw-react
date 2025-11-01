import IucnCategory, { IucnCategoryCode } from ".";

const categories: Array<{ code: IucnCategoryCode; label: string }> = [
  { code: "EX", label: "Extinct" },
  { code: "EW", label: "Extinct in the Wild" },
  { code: "CR", label: "Critically Endangered" },
  { code: "EN", label: "Endangered" },
  { code: "VU", label: "Vulnerable" },
  { code: "NT", label: "Near Threatened" },
  { code: "LC", label: "Least Concern" },
  { code: "DD", label: "Data Deficient" },
  { code: "NE", label: "Not Evaluated" },
];

export default {
  component: IucnCategory,
  title: "IucnCategory",
};

export const AllCategories = () => (
  <div className="flex flex-wrap gap-2">
    {categories.map(({ code, label }) => (
        <IucnCategory category={code} size="small" aria-label={label} />
    ))}
  </div>
);

export const CustomPresentation = () => (
  <div className="flex items-center gap-4">
    <IucnCategory category="CR" size="medium" label="Critically Endangered" />
    <IucnCategory category="LC" size="large" initialsSize={1}>
      OK
    </IucnCategory>
    <IucnCategory
      category="DD"
      size="medium"
      label="No data"
      title="No data available"
    />
  </div>
);

export const WithVisibleLabels = () => (
  <div className="flex flex-col gap-3">
    {categories.map(({ code, label }) => (
      <IucnCategory
        key={code}
        category={code}
        size="small"
        label={label}
        showLabel
      />
    ))}
  </div>
);

export const WithoutLabels = () => (
  <div className="flex items-center gap-4">
    <IucnCategory category="CR" size="small" />
    <IucnCategory category="EN" size="small" />
    <IucnCategory category="LC" size="small" />
    <IucnCategory category="DD" size="small" />
  </div>
);

const portugueseLabels: Record<IucnCategoryCode, string> = {
  EX: "Extinto",
  EW: "Extinto na natureza",
  CR: "Criticamente em perigo",
  EN: "Em perigo",
  VU: "Vulneravel",
  NT: "Quase ameacado",
  LC: "Pouco preocupante",
  DD: "Dados insuficientes",
  NE: "Nao avaliado",
};

export const LocalizedLabels = () => (
  <div className="flex flex-wrap gap-6">
    {categories.map(({ code }) => (
      <div
        key={code}
        className="flex w-32 flex-col items-center gap-2 text-center"
      >
        <IucnCategory
          category={code}
          size="small"
          labels={portugueseLabels}
          showLabel
          wrapperClassName="flex flex-col items-center gap-2"
          labelClassName="text-xs text-govbr-gray-80"
        />
      </div>
    ))}
  </div>
);
