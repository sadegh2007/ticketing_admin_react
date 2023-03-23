import {ReactSVG} from "react-svg";
import {useContext, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {appContext} from "../../context/AppContext.js";
import {handleError} from "../../services/GlobalService.js";
import {CreateRole, GetRoleById, UpdateRole} from "../../services/RoleService.js";
import {AllPermissions} from "../../services/PermissionService.js";

const RoleModal = ({role, show, closeModal}) => {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [allPermissions, setAllPermissions] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState([]);

    const {register, formState: {errors}} = useForm();
    const {showMainLoader, toggleMainLoader} = useContext(appContext);

    useEffect(() => {

        getData().then(res => {});

    }, [role]);

    const getData = async () => {
        toggleMainLoader(true);

        if (role) {
            setName(role.name);
            setTitle(role.title);
        }

        try {

            const perms = await AllPermissions();
            setAllPermissions(perms);

            if (role) {
                const roleById = await GetRoleById(role.id);
                const selectedPerms = roleById.permissions.map(x => x.id);
                setSelectedPermissions(selectedPerms);
            }
        } catch (err) {
            handleError(err.response);
        }

        toggleMainLoader(false);
    }

    const saveRole = () => {
        toggleMainLoader(true);

        const data = {
            name: name,
            title: title,
            permissions: selectedPermissions
        };

        if (role) {
            UpdateRole(role.id, data)
                .then(res => {
                    toggleMainLoader(false);
                    closeModal(true);
                })
                .catch(err => {
                    toggleMainLoader(false);
                    handleError(err.response);
                });
        } else {
            CreateRole(data)
                .then(res => {
                    toggleMainLoader(false);
                    closeModal(true);
                })
                .catch(err => {
                    toggleMainLoader(false);
                    handleError(err.response);
                });
        }
    }

    const permissionSelected = (e, permissionId) => {

        if (e.target.checked) {
            const permissions = [...selectedPermissions];
            permissions.push(permissionId);
            setSelectedPermissions(permissions);
        }
        else {
            const permissions = [...selectedPermissions].filter(x => x !== permissionId);
            setSelectedPermissions(permissions);
        }
        console.log(selectedPermissions);
    }

    return (
        <div className={`modal ${show ? 'modal-open' : ''} overflow-visible`}>
            <div className="modal-box rounded relative" style={{overflow: 'initial'}}>
                <button onClick={() => {
                    setName('');
                    setTitle('');

                    closeModal(false)
                }} className="btn btn-sm btn-square btn-svg text-gray-600 rounded btn-outline absolute left-2 top-2">
                    <ReactSVG src="/src/assets/svgs/X.svg"/>
                </button>
                <h3 className="text-lg font-bold">
                    {role ? 'ویرایش' : 'ایجاد'} نقش
                </h3>

                <div className="form">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">نام</span>
                            </label>
                            <input
                                type='text'
                                placeholder='نام...'
                                {...register('name', {required: true})}
                                value={name}
                                onInput={(e) => setName(e.target.value)}
                                style={{height: '38px'}}
                                className={`input input-bordered rounded focus:outline-none text-sm w-full placeholder-gray-600 ${errors.title && ''}`}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">عنوان</span>
                            </label>
                            <input
                                type='text'
                                placeholder='عنوان...'
                                {...register('title', {required: true, pattern: /(09)\d{9}/})}
                                value={title}
                                onInput={(e) => setTitle(e.target.value)}
                                style={{height: '38px'}}
                                className={`input input-bordered rounded focus:outline-none text-sm w-full placeholder-gray-600 ${errors.title && ''}`}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-1 mt-2">
                        {
                            allPermissions.map((permission) => {

                                return <div key={permission.id} className="form-control">
                                    <label className="label justify-start cursor-pointer">
                                        <input checked={selectedPermissions.includes(permission.id) ? 'checked' : ''} onChange={(e) => permissionSelected(e, permission.id)} value={permission.id} type="checkbox" className="checkbox"/>
                                        <span className="label-text mr-2">{permission.title}</span>
                                    </label>
                                </div>
                            })
                        }
                    </div>
                </div>

                <div className="modal-action">
                    <button disabled={!name || name.length === 0 || !title || title.length === 0} onClick={saveRole}
                            className="btn rounded btn-success text-white">ثبت
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RoleModal;