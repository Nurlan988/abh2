import axios from "axios";

export const getAllUsersApi = async () => {
    const data = await axios.get("http://localhost:3001/users");
    return data;
};

export const addNewUserApi = async (user) => {
    const data = await axios.post("http://localhost:3001/users", {
        id: `${Date.now()}`,
        fullname: user.fullname,
        created_at: new Date().toISOString(),
        phone: user.phone,
        region: user.region,
        status: "Активен",
    });
    return data;
};

export const editUserApi = async (user) => {
    const data = await axios.put(`http://localhost:3001/users/${user.id}`, {
        id: user.id,
        fullname: user.fullname,
        created_at: user.created_at,
        phone: user.phone,
        region: user.region,
        status: user.status,
    });
    return data;
};

export const deleteUserApi = async (id) => {
    const data = await axios.delete(`http://localhost:3001/users/${id}`);
    return data;
};
