import clsx from "clsx"
import React from "react"

enum ButtonType {
    button = "button",
    submit = "submit"
}   

interface Props {
    title?: string;
    loadingText?: string;
    loading: boolean;
    onClick?: React.MouseEventHandler;
    className?: string;
    type?: string;
}

export default function LoadingButton({title="Submit", loadingText="Loading...", loading, onClick, className="", type="button"}: Props) {

    return (
        <button className={clsx("btn btn-primary", className)} disabled={loading} value="Fix Products" onClick={onClick} type={type}>
            <span className={clsx(
                "spinner-border spinner-border-sm me-1",
                {
                    'visually-hidden': !loading
                }
            )} role="status" aria-hidden="true"></span>
            <span className={clsx(
                {
                    'visually-hidden': !loading
                }
            )}>{loadingText}</span>
            <span className={clsx(
                {
                    'visually-hidden': loading
                }
            )}>{title}</span>
        </button>
    )
}