export default function Error({ error }) {

    return (
        <div className={'rounded-md w-fit px-2 ring-1 ring-red-500 bg-red-50'} >
            <p className={'text-center text-sm text-red-500'}>• {error}</p>
        </div>
    );
}