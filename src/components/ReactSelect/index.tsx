import Select, { InputActionMeta } from 'react-select';
import './ReactSelect.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ReactSelect({ listaEventos }: { listaEventos: any }) {
    const navigate = useNavigate();
    const refresh = () => window.location.reload();
    const [value, setValue] = useState(Object);

    const handelSelect = (e: any) => {
        setValue(e);
    }

    useEffect(() => {
        if (value != null && value.value != undefined ) {
            console.log("Valor:", value.value);
            navigate(`/evento/${value.value}`)
            refresh();
        }
    }, [value]);
    
    return (
        <>
            <Select
                className="basic-single ReactSelect"
                classNamePrefix="select"
                isDisabled={false}
                isLoading={false}
                isClearable={true}
                isRtl={false}
                isSearchable={true}
                name="color"
                options={listaEventos}
                onChange={handelSelect}
                value={value}
            />
        </>
    );
};