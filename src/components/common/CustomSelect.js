import Select from 'react-select';
import { Controller } from "react-hook-form";

export default function CustomSelect({ name, control, options, isDisabled }) {
    const customStyles = {
        option: (provided) => ({
            ...provided,
            color: 'white',
        })
    }

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value, ref } }) => (
                <Select
                    styles={customStyles}
                    isDisabled={isDisabled}
                    inputRef={ref}
                    defaultValue={[options[0]]}
                    options={options}
                    onChange={val => onChange(val.value)}
                    value={options.find(c => c.value === value)}
                    theme={(theme) => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            text: '#ffffff',
                            primary25: '#2a2e37',
                            primary: '#4506cb',
                            neutral0: '#3d4451',
                            neutral80: '#ffffff',
                            neutral60: '#ffffff',
                            neutral40: '#ffffff',
                            neutral30: '#570df8',
                            neutral20: '#570df8',
                            neutral10: '#2a2e37',
                            neutral5: '#2a2e37',
                        },
                    })}
                />
            )}
        />
    );
}