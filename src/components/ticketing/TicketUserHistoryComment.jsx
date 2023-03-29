const TicketUserHistoryComment = ({comment}) => {
    let message = `اضافه شدن ${comment.message} توسط ${comment.creator.fullName}`

    if (comment.type === 'delete') {
        message = `حذف ${comment.message} توسط ${comment.creator.fullName}`
    }
    if (comment.type === 'left') {
        message = `خروج ${comment.message}`
    }

    return (
        <div id={comment.id} className={`chat-message`}>
            <div className={`flex justify-center text-xs`}>
                <span
                    className={`text-white font-semibold py-1 px-3 rounded-xl ${comment.type !== 'add' ? 'bg-error' : 'bg-gray-600'}`}>{message}</span>
            </div>
        </div>
    )
}

export default TicketUserHistoryComment;