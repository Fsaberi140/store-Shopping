import { Link } from "react-router-dom";

function RowDataTable({
  number,
  id,
  name,
  removeCategory
}) {


  return (
    <tr>
      <td>{number}</td>
      <td>{name}</td>
      <td>
        <button className="btn btn-danger  me-2" onClick={(id)=>removeCategory(id)}>
          <i className="bi bi-trash3-fill"></i>
        </button>
        <Link className="btn btn-warning" to={`/edit-category/${id}`} >
          <i className="bi bi-pencil-square"></i>
        </Link>
      </td>
    </tr>
  );
}

export default RowDataTable;
