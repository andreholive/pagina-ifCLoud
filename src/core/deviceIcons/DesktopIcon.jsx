const DesktopIcon = ({size, status}) => {
    let light = 'mainLight-off'
    switch(status){
        case 4:
        light = 'mainLight-off';
        break;
        case 1:
        light = 'mainLight-on';
        break;
        case 2:
        light = 'mainLight-work'
    }
    
    return (
        <svg viewBox="0 0 188.6 153.4" width={size}>
            <g transform="matrix(1.2024 0 0 1.2024 -50.551 -10.729)">
	            <rect x="102.6" y="104.3" fill="#5B5B5B" width="34.6" height="27.9"/>
	            <path fill="#848484" d="M96.5,130h46.7c1.2,0,2.2,1,2.2,2.2l0,0c0,1.2-1,2.2-2.2,2.2H96.5c-1.2,0-2.2-1-2.2-2.2l0,0 C94.5,131.1,95.3,130,96.5,130z"/>
            </g>
            <path fill="#333333" stroke="#2B2B2B" strokeWidth="2.4048" strokeLinecap="round" strokeLinejoin="round" d="M8.5,2.8h170.4c3.6,0,6.7,3,6.7,6.7v109.1c0,3.6-3,6.7-6.7,6.7H8.5c-3.6,0-6.7-3-6.7-6.7V9.3C1.8,5.9,4.9,2.8,8.5,2.8z"/>
            <circle fill="#B1B1B1" cx="93.7" cy="114.5" r="5.5"/>
            <path fill="#2B2B2B" d="M8.5,2.8c-3.6,0-6.7,3-6.7,6.7v94.3h183.7V9.5c0-3.6-3-6.7-6.7-6.7H8.5L8.5,2.8z"/>
            <path d="M8.1,9.1h171.2v88.2H7.5L8.1,9.1z"/>
            {
            status ? 
            <circle className={light} cx="15.6" cy="114.5" r="3.2"/> : 
            <circle fill="red" cx="15.6" cy="114.5" r="3.2"/>
            }
        </svg>
    )
};

export default DesktopIcon;
