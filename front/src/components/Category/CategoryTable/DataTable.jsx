import { useEffect, useState } from "react";
import RowDataTable from "./RowDataTable";
import setHeaders from "../../../utilitis/setHeaders";
import { showErrorMessage, showSuccessMessage } from "../../../utilitis/toaster";
import CategoryService from "../../../service/categoryService";

function DataTable() {
  const [Categories, setCategories] = useState([]);

  useEffect(() => {
    CategoryService.getCategories()
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const removeCategory = (id) => {
    
     CategoryService.deleteCategory(id)
       .then((res) => {
         showSuccessMessage("Delete Category Successful.");
         setCategories((Categories) =>
           Categories.filter((item) => item.id !== id)
         );
       })
       .catch((error) => showErrorMessage("Delete Category failed."));
  };

  return (
    <div className="table-responsive">
      {Categories.length ? (
        <table className="table table-striped table-sm">
          <thead className="text-white  ">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Categories.map(function (item, index) {
              return (
                <RowDataTable
                  key={item.id}
                  number={index + 1}
                  {...item}
                  removeCategory={removeCategory}
                />
              );
            })}
          </tbody>
        </table>
      ) : (
        <h1>There are no Categories.</h1>
      )}
    </div>
  );
}

export default DataTable;
