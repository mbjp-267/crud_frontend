import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const UserList = () => {
const [users, setUser] = useState([]);

useEffect(() => {
    getUsers();
}, []);

const getUsers = async () => {
    try {
    const response = await axios.get("http://localhost:5000/users");
    setUser(response.data);
    } catch (error) {
    console.log("Failed to fetch users:", error);
    }
};

const deleteUser = async (id) => {
    // 🆕 Konfirmasi popup
    Swal.fire({
    title: "Yakin ingin menghapus?",
    text: "Data tidak dapat dikembalikan!",
    icon: "warning",
    showCancelButton: true,
      confirmButtonColor: "#e3342f", // merah
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Batal"
    }).then(async (result) => {
    if (result.isConfirmed) {
        try {
        await axios.delete(`http://localhost:5000/users/${id}`);
          getUsers(); // refresh
        Swal.fire("Dihapus!", "User berhasil dihapus.", "success");
        } catch (error) {
        console.log("Failed to delete user:", error);
        Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus.", "error");
        }
    }
    });
};

return (
    <div className="columns mt-5 is-centered">
    <div className="column is-half">
        <Link to={`add`} className="button is-success mb-3">
        Add New
        </Link>
        <table className="table is-striped is-fullwidth">
        <thead>
            <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {users.length === 0 ? (
            <tr>
                <td colSpan="5" className="has-text-centered">
                Tidak ada data user.
                </td>
            </tr>
            ) : (
            users.map((user, index) => (
                <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>
                    <Link
                    to={`edit/${user.id}`}
                    className="button is-small is-info mr-2"
                    >
                    Edit
                    </Link>
                    <button
                    onClick={() => deleteUser(user.id)}
                    className="button is-small is-danger"
                    >
                    Delete
                    </button>
                </td>
                </tr>
            ))
            )}
        </tbody>
        </table>
    </div>
    </div>
);
};

export default UserList;