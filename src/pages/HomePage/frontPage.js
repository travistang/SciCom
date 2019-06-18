import React from "react"
import CenterNotice from "../../components/centerNotice"
import { withRouter } from "react-router-dom"
import {
	TabContent,
	TabPane,
	Nav,
	NavItem,
	NavLink,
	Card,
	Button,
	CardTitle,
	CardText,
	Row,
	Col,
	Container
} from "reactstrap"
// import ProjectCard from '../../components/projectCard'
import ProjectCard from "../../components/ProjectResultCard"
import UserChip from "../../components/userChip"
import Icon from "../../components/icon"
import ApplicationCard from "./applicationCard"
import classnames from "classnames"
import { getProject, getApplications } from "../../backend/user"
import Section from "./Section"

class FrontPage extends React.Component {
	constructor(props) {
		super(props)
		// for studnets only
		this.state = {
			activeTab: "bookmark"
		}
	}
	// politicians' components
	projectList(projects) {
		return projects.map(p => (
			<ProjectCard
				style={style.projectCard}
				project={p}
				key={p._id}
				onClick={() => this.props.history.push(`/project/${p._id}`)}
				isOwner={true}
			/>
		))
	}

	// studnets' components
	bookmarkTab(bookmarks) {
		if (!bookmarks || !bookmarks.length) {
			return <CenterNotice title="No bookmarks found" />
		}
		return bookmarks.map(p => (
			<ProjectCard
				project={p}
				key={p._id}
				onClick={() => this.props.history.push(`/project/${p._id}`)}
				isOwner={false}
			/>
		))
	}
	applicationTab(applications) {
		if (!applications || !applications.length) {
			return <CenterNotice title="No applications found" />
		}
		return applications.map(app => (
			<ProjectCard
				onClick={() => this.props.history.push(`/project/${app.project._id}`)}
				project={app.project}
				key={app.project._id}
			/>
		))
	}

	onGoingProjectsTab(projects) {
		if (!projects) return null
		const onGoingProjects = projects.filter(p => p.status == "active")

		return (
			<Section icon="project" title="Ongoing Projects">
				{this.projectList(onGoingProjects)}
			</Section>
		)
	}

	render() {
		const { isPolitician, bookmarks, applications, projects } = this.props.user

		// students' front page
		if (this.props.isUserHimself)
			return (
				<div style={style.container}>
					<Container>
						{isPolitician && projects && (
							<Section title="Projects" icon="project">
								{this.projectList(projects)}
							</Section>
						)}
						{!isPolitician && bookmarks && (
							<Section icon="bookmark" title="Bookmarks">
								{this.bookmarkTab(bookmarks)}
							</Section>
						)}

						<Section icon="application" title="Applications">
							{this.applicationTab(applications)}
						</Section>
					</Container>
				</div>
			)
		else {
			return null
		}
	}
}

export default withRouter(FrontPage)

const style = {
	container: {
		padding: 16
	},
	contentHeader: {
		width: "100%"
	},
	content: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "flex-start",
		flexWrap: "wrap",
		margin: 16
	}
}
