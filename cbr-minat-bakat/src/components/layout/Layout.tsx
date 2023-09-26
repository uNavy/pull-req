
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Layout = (props: any) => {
    return (
        <>
            {<main >{props.children}</main>}
        </>
    )
}

export default Layout