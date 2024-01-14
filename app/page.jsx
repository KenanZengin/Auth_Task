
import LogoutButton from "../components/logout-button";
import DataTable from "../components/data-table";


export async function GetData(){
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products`);
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
