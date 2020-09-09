import React, {Component} from "react";
import Contact from "./contact";
import "./contact.css";

const contacts = [{
	firstName: "Барней",
	lastName: "Стинсовський",
	phone: "+380956319521",
	gender: "male"
}, {
	firstName: "Робін",
	lastName: "Щербатська",
	phone: "+380931460123",
	gender: "female"
}, {
	firstName: "Анонімний",
	lastName: "Анонімус",
	phone: "+380666666666"
}, {
	firstName: "Лілія",
	lastName: "Олдровна",
	phone: "+380504691254",
	gender: "female"
}, {
	firstName: "Маршен",
	lastName: "Еріксонян",
	phone: "+380739432123",
	gender: "male"
}, {
	firstName: "Теодор",
	lastName: "Мотсбес",
	phone: "+380956319521",
	gender: "male"
}];

function setIcon(str) {
	let icon = "";
	if(str === 'male') {
		icon = "👨";
	} else if(str === 'female') {
		icon = "👩";
	} return icon
	}

export default class Contacts extends Component {
	state = {
		contacts: [...contacts.sort((a, b) => (a.lastName > b.lastName) ? 1 : -1)],
		filtered: [...contacts],
		search: "",
		isMale: true,
		isFemale: true,
		isUnknown: true,
	}

	handleSearchChange = (search, event) => {
		this.setState({
			[search]: event.target.value,
			contacts: [...contacts.filter((contact) => {
				return (
						contact.firstName.toLowerCase().includes(event.target.value.toLowerCase())||
						contact.lastName.toLowerCase().includes(event.target.value.toLowerCase()) ||
						contact.phone.toLowerCase().includes(event.target.value.toLowerCase())
				)
				})
			]
		})
	}

	handleCheckboxChange = () => {
		const female = document.getElementById("female");
		const male = document.getElementById("male");
		const unknown = document.getElementById("unknown");

		this.setState(() => {
			const filterGender = this.state.filtered.filter(contact =>
					((contact.gender === 'male') && male.checked) ||
					((contact.gender === 'female') && female.checked) ||
					((contact.gender === undefined) && unknown.checked))
			return {contacts: filterGender}
			});
		};

	render() {
		return (
					<div className="contacts-wrapper">
						<form className="search">
							<label><input id="female" value={this.state.isFemale} type="checkbox" defaultChecked name="female" onChange={this.handleCheckboxChange}/>female</label>
							<label><input id="male"  value={this.state.isMale} name="male" type="checkbox" defaultChecked onChange={this.handleCheckboxChange} />male</label>
							<label><input id="unknown"  value={this.state.isUnknown} name="unknown" type="checkbox"  defaultChecked onChange={this.handleCheckboxChange} />anonymous</label>
							<label><input type="text"  placeholder="Search..." value={this.state.search} onChange={this.handleSearchChange.bind(this, 'search')}/></label>
						</form>
						<table>
							<caption>Contacts</caption>
							<thead>
							<tr>
								<th>First name</th>
								<th>Last name</th>
								<th>Phone</th>
								<th>Gender</th>
							</tr>
							</thead>
							<tbody>
								{this.state.contacts.map((contact) => {
									return (
											<Contact
													firstName={contact.firstName}
													lastName ={contact.lastName}
													phone={contact.phone}
													gender={setIcon(contact.gender)}
											/>
										)
									})
								}
							</tbody>
							<tfoot>
							<tr>
								<td>Contacts: {this.state.contacts.length}</td>
							</tr>
							</tfoot>
						</table>
					</div>
		);
	}
};
