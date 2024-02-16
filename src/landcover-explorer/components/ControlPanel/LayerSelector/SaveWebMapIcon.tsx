import React, { FC } from 'react';

type Props = {
    onClick: () => void;
};

const SaveWebMapIcon: FC<Props> = ({ onClick }: Props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
            viewBox="0 0 16 16"
            height="16"
            width="16"
            onClick={onClick}
        >
            <path
                fill="currentColor"
                d="M1 1h8v1H2v12h12V7h1v8H1zm7.325 7.382L14 2.707V5h1V1h-4v1h2.293L7.618 7.675z"
            />
            <path fill="none" d="M0 0h16v16H0z" />
        </svg>
    );
};

export default SaveWebMapIcon;
