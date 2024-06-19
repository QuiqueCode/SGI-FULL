import { useState } from "react";
import { useHistory } from "react-router"
import { UserAdminModel, UserSuspendModel } from "../../models/UserAdminModel/UserAdminModel";
import { UserAdminService } from "../../services/UserAdminService/UserAdminService";

export const userAdminVM=()=>{
const history=useHistory();
const [users,setUsers]=useState<UserAdminModel[]>([]);

const [error, setError] = useState<string | null>(null);
const [searchTerm, setSearchTerm] = useState('');

// Función para manejar cambios en el IonSearchbar
const handleSearchChange = (e:any) => {
setSearchTerm(e.target.value);
};
const filteredData = users.filter(user =>
user.CT_CEDULA.toLowerCase().includes(searchTerm.toLowerCase())
);

const goToBack=()=>{
    history.push('/adminView')
}
const goToEdit=(id:string)=>{
    localStorage.setItem('usrInfo',id)
    history.push('/editUsr')
}

const getUsers= async()=>{
    const data= await UserAdminService.getUsers();
    setUsers(data)
}
const supendUser= async(data:UserSuspendModel)=>{
    await UserAdminService.suspendUser(data)
    getUsers();
}

    return{
        getUsers,
        users,
        supendUser,
        handleSearchChange,
        searchTerm,
        filteredData,
        goToBack,
        goToEdit
    }
}