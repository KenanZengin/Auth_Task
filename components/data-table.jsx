"use client"

import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Filter, IFilter, VirtualScroll, Sort, Group } from '@syncfusion/ej2-react-grids';

const DataTable = ({data}) => {
    console.log(data.products);
  return (
    <div>
        <GridComponent
            dataSource={data.products}
            allowPaging={true}
            pageSettings={{pageSize : 10}}
            allowFiltering={true}
            allowGrouping={true}
        >
            <ColumnsDirective>
                <ColumnDirective field='id' />
                <ColumnDirective field='title' headerText='Product' />
                <ColumnDirective field='price' />
                <ColumnDirective field='stock' />
            </ColumnsDirective>
            <Inject services={[Page,Filter,Group]} />
        </GridComponent>
    </div>
  )
}

export default DataTable