export const getLocalStorageValue = () => {
    const adminLoginData = JSON.parse(localStorage.getItem('adminLogin'));
    if (adminLoginData && adminLoginData.token) {
        return adminLoginData;
    } else {
        console.error('No valid adminLogin data found in localStorage');
        return null;
    }
};
