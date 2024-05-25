export default function numberSeparator(distance: any) {
    return distance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}