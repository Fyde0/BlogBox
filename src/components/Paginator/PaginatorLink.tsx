import RouterLink from "../RouterLink"

function PaginatorLink({ page, active }: { page: number, active: boolean }) {
    return (
        <RouterLink
            to={"../page/" + String(page)}
            type="pageItem"
            pageActive={active}
        >
            {page}
        </RouterLink>
    )
}

export default PaginatorLink