
import LogoutButton from "../components/logout-button";
import DataTable from "../components/data-table";


export async function GetData(){

  let base_url =
    process.env.NODE_ENV === "development"
      ? `${process.env.NEXTAUTH_URL}/api/products`
      : `${process.env.BASE_URL}/api/products`

  const res = await fetch(base_url);
  const data = await res.json();

  return data.products;
}


export default async function Home() {

  const data = await GetData();

  return (
   <div className="home_page">
      <LogoutButton/>
      <DataTable data={data} />
   </div>
  )
}
