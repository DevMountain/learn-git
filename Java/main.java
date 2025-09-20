public class main {
    public static void main(String[] args) {
        Student student = new Student("Alice", 101);
        System.out.println("Name: " + student.getName());
        System.out.println("Roll: " + student.getRoll());

        Calculator calculator = new Calculator();
        System.out.println("Addition: " + calculator.add(5, 3));
        System.out.println("Subtraction: " + calculator.subtract(5, 3));
        System.out.println("Multiplication: " + calculator.multiply(5, 3));
        System.out.println("Division: " + calculator.divide(5, 3));
    }
}