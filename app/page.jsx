
import LogoutButton from "../components/logout-button";
import DataTable from "../components/data-table";


//Api'den datayı GetData fonksiyonu ile alıyorum
export async function GetData(){

  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();

  return data.products;
}


export default async function Home() {

  const data = await GetData();

  return (
   <div className="home_page">
      <DataTable data={data} />  {/*Datayı göstereceğim componente api'den gelen verileri yolluyorum*/}
      <LogoutButton/>
   </div>
  )
}
