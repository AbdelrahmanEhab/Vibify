import Link from "next/link";

interface Song {
    name: string;
    artist: string;
    album: string;
    url: string;
    artistPhotoUrl: string;
}

interface TablePros {
    songs: Song[];
}

const Table : React.FC<TablePros> = ({songs}) => {

    return (
        <>
            <table className="table-fixed w-full text-black border-collapse border border-black">
                <thead >
                  <tr className="bg-green text-xl">
                    <th className="px-4 py-4 text-black border-collapse border-b-1 border-black">Artist</th>
                    <th className="px-4 py-4 text-black border-collapse border-b-1 border-black">Song</th>
                    <th className="px-4 py-4 text-black border-collapse border-b-1 border-black">Album</th>
                    <th className="px-4 py-4 text-black border-collapse border-b-1 border-black">Url</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                    {
                        songs.map((song => (
                            <tr key={song.name} className="text-center">
                                <td className="px-4 py-4 border-collapse border-b-1 border-grey">{song.artist}</td>
                                <td className="px-4 py-4 border-collapse border-b-1 border-grey">{song.name}</td>
                                <td className="px-4 py-4 border-collapse border-b-1 border-grey">{song.album}</td>
                                <td className="px-4 py-4 border-collapse border-b-1 border-grey">
                                    <Link href={song.url} target="_blanck" className="underline">
                                        Song URL
                                    </Link>
                                </td>
                            </tr>
                        )))
                    }
                </tbody>
            </table>
        </>
    )
}

export default Table