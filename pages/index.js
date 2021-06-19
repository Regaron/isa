import { Fragment, useState } from "react";
import ProductTable from "../components/ProductTable";
import Select, { ATTACKS } from "../components/Select";
import Input from "../components/Input";
import useSWR from "swr";
import Button from "../components/Button";
import { RefreshIcon } from "@heroicons/react/solid";

export default function Home() {
  const [term, setTerm] = useState("");
  const [selected, setSelected] = useState(ATTACKS[0]);
  return (
    <Fragment>
      <div className={"grid grid-cols-12 items-end m-4 gap-4"}>
        <Input
          setTerm={setTerm}
          value={selected.value}
          setValue={(value) =>
            setSelected({
              ...selected,
              value,
            })
          }
        />
        <Select selected={selected} setSelected={setSelected} />
        <Button onClick={() => setTerm(selected.value)}>Start</Button>
      </div>
      <ShowResult id={term ? selected.id : 0} term={term} />
    </Fragment>
  );
}

function ShowResult({ id, term }) {
  const { data: products, error } = useSWR("/api/search?term=" + term);
  if (!products && !error) {
    return (
      <RefreshIcon
        className={"absolute animate-spin left-1/2 top-1/2 w-16 h-16"}
      />
    );
  }
  switch (id) {
    case 1:
      return (
        <article className="relative pt-16 prose lg:prose-xl mx-auto text-center">
          <h1>Injection Possible</h1>
          <p>
            Since the server returned error instead of empty product list or
            product that has single quote in its name, injection is possible.
          </p>
        </article>
      );
    case 2:
      return (
        <article className="relative pt-16 prose lg:prose-xl mx-auto text-center">
          <h1>The Database is Postgresql.</h1>
          <p>
            Since the query took more time than it would we can conclude that
            the database is postgres as pg_sleep(<i>sec</i>) query worked and
            verify by changing the sleep time. For MySQL SLEEP(<i>sec</i>) query
            can be used.
          </p>
        </article>
      );
    case 4:
      return (
        <Fragment>
          <ProductTable products={products} />
          <article className="relative pt-16 prose lg:prose-xl mx-auto text-center">
            <h1>Seven Columns in Query.</h1>
            <p>
              Since we selected 7 columns in UNION query and the response was
              successful we can conclude that there are seven columns. The
              number of columns can be can be found by trial and error.
            </p>
          </article>
        </Fragment>
      );
    default:
      return <ProductTable products={products} />;
  }
}
