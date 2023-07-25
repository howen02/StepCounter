import { StyleSheet, Text, View } from 'react-native';

type ValueProps = {
label: string;
value: string;
}

const Value = ({ label, value }: ValueProps) => (
<View>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
</View>
);

const styles = StyleSheet.create({
label: {
    color: 'white',
    fontSize: 20,
},
value: {
    fontSize: 45,
    color: 'red',
    fontWeight: '500'
}
});

export default Value;