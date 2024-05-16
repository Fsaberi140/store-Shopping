import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoryService from "../../service/categoryService";
import { showErrorMessage, showSuccessMessage } from "../../utilitis/toaster";

function CreateOrEditCategoryForm() {
  const [categoryInfo, setCategoryInfo] = useState({
    image: "tt",
    name: "",
    description: "erer",
  });
  const [editState, setEditState] = useState(false);
  let { id } = useParams();
  const navigate = useNavigate();

  // if update mode, get Category detail and fill inputs and image and date picker
  useEffect(() => {
    if (id) {
      CategoryService.getCategoryDetailById(id)
        .then((res) => {
          setEditState(true);
          setCategoryInfo(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const insertCategory = (e) => {
    e.preventDefault();
    if (editState) {
      CategoryService.editCategory(id, categoryInfo)

        .then((res) => {
          showSuccessMessage("Edit Category Successful.");
          navigate("/admin-panel/categories");
        })
        .catch((error) => showErrorMessage("Edit Category failed."));
    } else {
      console.log(categoryInfo);
      CategoryService.createCategory(categoryInfo)
        .then((res) => {
          if (res.status == 400) {
            showErrorMessage(res.data.error);
          } else {
            showSuccessMessage("Create Category Successful.");
            navigate("/admin-panel/categories");
          }
        })
        .catch((error) => showErrorMessage("Create Category failed."));
    }
  };

  const cancelAction = () => {
    navigate("/admin-panel/categories");
  };
  return (
    <>
      <h2 className="my-5 text-center">
        {editState ? "Edit Category Form" : "Create Category Form"}
      </h2>
      <form className="w-25 m-auto" action="" onSubmit={insertCategory}>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Name:
          </label>
          <input
            name="name"
            type="text"
            className="form-control"
            value={categoryInfo.name}
            onChange={(e) =>
              setCategoryInfo({ ...categoryInfo, name: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <button
            type="button"
            className="btn btn-danger"
            onClick={cancelAction}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-success ms-3">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateOrEditCategoryForm;
