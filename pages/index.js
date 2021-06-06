import { Fragment, useState } from "react";
import ProductTable from "../components/ProductTable";
import Select from "../components/Select";
import Input from "../components/Input";
import useSWR from "swr";
import Button from "../components/Button";

export default function Home() {
  const [term, setTerm] = useState("");
  const { data: products } = useSWR("/api/search?term=" + term);

  return (
    <Fragment>
      <div className={"grid grid-cols-12 items-end m-4 gap-4"}>
        <Input setTerm={setTerm} />
        <Select />
        <Button>Start</Button>
      </div>
      <ProductTable products={products} />
    </Fragment>
  );
}
