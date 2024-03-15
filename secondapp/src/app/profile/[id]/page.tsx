export default function UserProfile({ params }: any) {
    return (
        <div className="flex flex-col m-2 bg-slate-50">
            <div className="flex flex-col gap-5 p-2 ">
                Profile
                <p className="text-4xl md:text-center">Profile Page : <span className="bg-gray-500 rounded">{params.id}</span></p>
            </div></div>
    )
}