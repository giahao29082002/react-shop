
import PropTypes from 'prop-types';

const TimelineStep = ({ step, order, isCompleted, isCurrent, isLastStep, icon, description }) => {
    const iconBgColor = isCompleted || isCurrent ? `bg-${icon.bgColor}` : 'bg-gray-100';
    const iconTextColor = isCompleted || isCurrent ? 'text-white' : `text-${icon.textColor}`;
    const connectorColor = isCompleted ? 'bg-blue-500' : 'bg-gray-200';
    const labelTextColor = isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500';
    const descriptionTextColor = isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500';
    return (
        <li className='relative mb-6 sm:mb-0 sm:pl-5'>
            <div className='flex items-center'>
                <div className={`z-10 flex items-center justify-center w-6 h-6 ${step?.status === 'completed' ? 'bg-green-900 text-green-100'
                    : step?.status === 'pending' ? 'bg-red-700 text-red-100'
                        : step?.status === 'proccessing' ? 'bg-blue-600 text-blue-100'
                            : 'bg-indigo-900 text-indigo-100'}
       rounded-full ring-0 ring-white shrink-0
            `}>
                    <i className={`ri-${icon.iconName} text-xl`}></i>
                </div>
                {!isLastStep && (<div className={`hidden sm:flex w-full h-0.5 ${connectorColor}`}>

                </div>)}
            </div>
            <div className='mt-3 sm:pe-8'>
                <h3 className={`font-medium text-base ${labelTextColor}`}>{step.label}</h3>
                <time className="block mb-2 text-sm font-normal leading-none  text-gray-400">
                    {order.updatedAt ? new Date(order.updatedAt).toLocaleDateString() : 'Time'}</time>
                <p className={`text-base font-normal ${descriptionTextColor}`}>{description}</p>
            </div>
        </li>
    )
}
TimelineStep.propTypes = {
    step: PropTypes.shape({
        label: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        icon: PropTypes.shape({
            iconName: PropTypes.string.isRequired,
            bgColor: PropTypes.string.isRequired,
            textColor: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    order: PropTypes.shape({
        status: PropTypes.string.isRequired,
        updatedAt: PropTypes.string,
    }).isRequired,
    isCompleted: PropTypes.bool.isRequired,
    isCurrent: PropTypes.bool.isRequired,
    isLastStep: PropTypes.bool.isRequired,
    icon: PropTypes.object.isRequired,
    description: PropTypes.string.isRequired,
};

export default TimelineStep