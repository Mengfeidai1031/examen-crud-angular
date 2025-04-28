import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private firebaseConfig = {
    projectId:"examen-3975b",
    appId:"1:453073404873:web:415fd777eb1ad9a0625e18",
    storageBucket:"examen-3975b.firebasestorage.app",
    apiKey:"AIzaSyDH29s_PQcIf71cphfB1OQjk9ud3El37Ik",
    authDomain:"examen-3975b.firebaseapp.com",
    messagingSenderId:"453073404873"
  };

  private app = initializeApp(this.firebaseConfig);
  private firestore = getFirestore(this.app);

  title= 'examen-angular';

  students: any[] = [];
  studentName: string = '';
  studentEmail: string = '';
  selectedStudentId: string | null = null;

  subjects: any[] = [];
  subjectName: string = '';
  subjectDescription: string = '';
  selectedSubjectId: string | null = null;

  grades: any[] = [];
  gradeValue: number | null = null;
  selectedStudentForGrade: string = '';
  selectedSubjectForGrade: string = '';
  selectedGradeId: string | null = null;

  ngOnInit() {
    this.loadStudents();
    this.loadSubjects();
    this.loadGrades();
  }

  async saveStudent() {
    if (!this.studentName || !this.studentEmail) return;

    if (this.selectedStudentId) {
      const docRef = doc(this.firestore, 'students', this.selectedStudentId);
      await updateDoc(docRef, { name: this.studentName, email: this.studentEmail });
    } else {
      const colRef = collection(this.firestore, 'students');
      await addDoc(colRef, { name: this.studentName, email: this.studentEmail });
    }
    this.clearStudentForm();
    await this.loadStudents();
  }

  async loadStudents() {
    const colRef = collection(this.firestore, 'students');
    const snapshot = await getDocs(colRef);
    this.students = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
  }

  editStudent(student: any) {
    this.studentName = student.name;
    this.studentEmail = student.email;
    this.selectedStudentId = student.id;
  }

  clearStudentForm() {
    this.studentName = '';
    this.studentEmail = '';
    this.selectedStudentId = null;
  }

  async deleteStudent(id: string) {
    const docRef = doc(this.firestore, 'students', id);
    await deleteDoc(docRef);
    await this.loadStudents();
  }

  async saveSubject() {
    if (!this.subjectName || !this.subjectDescription) return;

    if (this.selectedSubjectId) {
      const docRef = doc(this.firestore, 'subjects', this.selectedSubjectId);
      await updateDoc(docRef, { name: this.subjectName, description: this.subjectDescription });
    } else {
      const colRef = collection(this.firestore, 'subjects');
      await addDoc(colRef, { name: this.subjectName, description: this.subjectDescription });
    }
    this.clearSubjectForm();
    await this.loadSubjects();
  }

  async loadSubjects() {
    const colRef = collection(this.firestore, 'subjects');
    const snapshot = await getDocs(colRef);
    this.subjects = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
  }

  editSubject(subject: any) {
    this.subjectName = subject.name;
    this.subjectDescription = subject.description;
    this.selectedSubjectId = subject.id;
  }

  clearSubjectForm() {
    this.subjectName = '';
    this.subjectDescription = '';
    this.selectedSubjectId = null;
  }

  async deleteSubject(id: string) {
    const docRef = doc(this.firestore, 'subjects', id);
    await deleteDoc(docRef);
    await this.loadSubjects();
  }

  async saveGrade() {
    if (!this.selectedStudentForGrade || !this.selectedSubjectForGrade || this.gradeValue === null) return;

    if (this.selectedGradeId) {
      const docRef = doc(this.firestore, 'grades', this.selectedGradeId);
      await updateDoc(docRef, { studentId: this.selectedStudentForGrade, subjectId: this.selectedSubjectForGrade, grade: this.gradeValue });
    } else {
      const colRef = collection(this.firestore, 'grades');
      await addDoc(colRef, { studentId: this.selectedStudentForGrade, subjectId: this.selectedSubjectForGrade, grade: this.gradeValue });
    }
    this.clearGradeForm();
    await this.loadGrades();
  }

  async loadGrades() {
    const colRef = collection(this.firestore, 'grades');
    const snapshot = await getDocs(colRef);
    this.grades = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
  }

  editGrade(grade: any) {
    this.selectedStudentForGrade = grade.studentId;
    this.selectedSubjectForGrade = grade.subjectId;
    this.gradeValue = grade.grade;
    this.selectedGradeId = grade.id;
  }

  clearGradeForm() {
    this.selectedStudentForGrade = '';
    this.selectedSubjectForGrade = '';
    this.gradeValue = null;
    this.selectedGradeId = null;
  }

  async deleteGrade(id: string) {
    const docRef = doc(this.firestore, 'grades', id);
    await deleteDoc(docRef);
    await this.loadSubjects();
  }

  getStudentNameById(id: string): string {
    const student = this.students.find(s => s.id === id);
    return student ? student.name : 'Desconocido';
  }

  getSubjectNameById(id: string): string {
    const subject = this.subjects.find(s => s.id === id);
    return subject ? subject.name : 'Desconocido';
  }
}
