"use client"

import{ 
    GridComponent, 
    ColumnsDirective, 
    ColumnDirective, 
    Inject, 
    Page, 
    Filter,  
    Sort, 
    Group, 
    Edit,
    Toolbar,
} from '@syncfusion/ej2-react-grids'; //syncfusion'un grid ozelliklerini import edip tabloda kullanıyoruz.


const DataTable = ({data}) => {

   
    const editOptions =  {allowEditing: true, allowAdding: true, allowDeleting: true, mode : "Dialog"}
    const toolbarOptions = ["Add", "Edit", "Delete", "Update", "Cancel"]

    return (
        <div>
             <GridComponent 
                dataSource={data}
                allowPaging={true}
                pageSettings={{pageSize : 10}}
                allowFiltering={true}
                allowGrouping={true}
                allowSorting={true}
                editSettings={editOptions}
                toolbar={toolbarOptions}
            >
                <ColumnsDirective>
                    <ColumnDirective field='id' />
                    <ColumnDirective field='title' headerText='Product' editType='dropdownedit' />
                    <ColumnDirective field='price' editType='numericedit' />
                    <ColumnDirective field='stock' editType='numericedit'/>
                </ColumnsDirective>
                <Inject services={[Page,Filter,Group,Sort,Edit,Toolbar]} />
            </GridComponent>
        </div>
    )
}

export default DataTable