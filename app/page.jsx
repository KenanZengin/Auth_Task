
import LogoutButton from "@/components/logout-button";

import data2 from "../data/test.json"
import DataTable from "@/components/data-table";

export async function GetData(){
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products`);
  const data = await res.json();

  return data.products;
}

export default async function Home() {

  const data = await GetData();
  console.log(data);

  return (
   <div>
      

      <DataTable data={data2} />
      <LogoutButton/>
   </div>
  )
}
