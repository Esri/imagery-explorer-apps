import React, { FC } from 'react';

type Props = {
    // closeButtonOnClick: () => void;
    // donwloadButtonOnClick: () => void;
    children?: React.ReactNode;
};

const Header: FC<Props> = ({ children }: Props) => {
    return (
        <div className="relative text-custom-light-blue flex justify-between items-center mb-4 z-10">
            {/* <div className="flex items-center">
                <h5 className="uppercase mr-4">Land Cover in Acres</h5>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    height="24"
                    width="24"
                    className="cursor-pointer"
                    onClick={donwloadButtonOnClick}
                >
                    <path
                        fill="currentColor"
                        d="M13 3v12.294l2.647-2.647.707.707-3.853 3.854-3.854-3.854.707-.707L12 15.292V3zM6 21h13v-1H6z"
                    />
                    <path fill="none" d="M0 0h24v24H0z" />
                </svg>
            </div> */}

            <div className="flex items-center">{children}</div>
        </div>
    );
};

export default Header;
