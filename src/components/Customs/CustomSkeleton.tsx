import Skeleton from "@mui/material/Skeleton/Skeleton";



export const CustomSkeleton = ({ number = 10 }) => {
    return (
        <>
            {Array.from({ length: number }).map((_, index) => (
                <>
                    <div key={index} className="flex flex-col space-y-3">
                        <Skeleton className="h-[125px] w-[250px] rounded-md" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                </>
            ))}
        </>
    );
}